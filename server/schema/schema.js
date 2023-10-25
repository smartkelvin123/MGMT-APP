// const { projects, clients } = require("../sampleData");
//  this is because i dont need the data from sample data again

const Project = require("../models/Project");
const Client = require("../models/Client");

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLEnumType,
} = require("graphql");

// Define the Project Type
const ProjectType = new GraphQLObjectType({
  name: "Project",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client: {
      type: ClientType,
      resolve(parent, args) {
        return Client.findById(parent.clientId);
      },
    },
  }),
});

// Define the ClientType
const ClientType = new GraphQLObjectType({
  name: "Client",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});

// Define the RootQuery
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    clients: {
      // to get all client
      type: new GraphQLList(ClientType),
      resolve(parent, args) {
        return Client.find();
      },
    },
    client: {
      // to get a single client
      type: ClientType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Client.findById(args.id);
      },
    },
    projects: {
      // to get all project
      type: new GraphQLList(ProjectType),
      resolve(parent, args) {
        return Project.find();
      },
    },
    project: {
      // to get a single project
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Project.findById(args.id);
      },
    },
  },
});

// Define the Mutation
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    // add a client
    addClient: {
      type: ClientType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        phone: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        const client = new Client({
          name: args.name,
          email: args.email,
          phone: args.phone,
        });

        return client.save();
      },
    },
    // delete a client
    deleteClient: {
      type: ClientType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Client.findByIdAndRemove(args.id);
      },
    },

    // add a project
    addProject: {
      type: ProjectType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) },
        status: {
          type: new GraphQLEnumType({
            name: "ProjectStatus",
            values: {
              NOT_STARTED: { value: "NOT_STARTED" },
              IN_PROGRESS: { value: "In Progress" },
              COMPLETED: { value: "Completed" },
            },
            defaultValue: "NOT_STARTED",
          }),
        },
        clientId: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        const project = new Project({
          name: args.name,
          description: args.description,
          status: args.status,
          clientId: args.clientId,
        });
        return project.save();
      },
    },
    // delete a project
    deleteProject: {
      type: ProjectType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      async resolve(parent, args) {
        try {
          const deletedProject = await Project.findByIdAndRemove(args.id);
          if (!deletedProject) {
            throw new Error("Project not found or could not be deleted.");
          }
          return deletedProject;
        } catch (error) {
          throw new Error(`Failed to delete project: ${error.message}`);
        }
      },
    },

    // update a project
    updateProject: {
      type: ProjectType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: {
          type: new GraphQLEnumType({
            name: "ProjectStatusUpdate",
            values: {
              NOT_STARTED: { value: "NOT_STARTED" },
              IN_PROGRESS: { value: "In Progress" },
              COMPLETED: { value: "Completed" },
            },
          }),
        },
      },
      // resolve(parent, args) {
      //   return Project.findByIdAndUpdate(
      //     args.id,
      //     {
      //       $set: {
      //         status: args.status,
      //         description: args.description,
      //         name: args.name
      //       }
      //     },
      //     { new: true }
      //   );
      // }

      resolve(parent, args) {
        const updateFields = {};

        if (args.name) {
          updateFields.name = args.name;
        }

        if (args.description) {
          updateFields.description = args.description;
        }

        if (args.status) {
          updateFields.status = args.status;
        }

        return Project.findByIdAndUpdate(
          args.id,
          { $set: updateFields },
          { new: true }
        );
      },
    },
  },
});

// Create the GraphQL schema
const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

module.exports = schema;
