const Project = require("../models/project");
const Client = require("../models/Client");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

// Define the UserType
const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
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
    // to get a single project
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return User.findById(args.id);
      },
    },
    // to get all user
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return User.find();
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
        Project.find({ clientId: args.id }).then((projects) => {
          projects.forEach((project) => {
            project.deleteOne();
          });
        });

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

    // register a new user

    registerUser: {
      type: UserType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, args) {
        const { name, email, password } = args;

        try {
          // Check if the user already exists
          const existingUser = await User.findOne({ email });
          if (existingUser) {
            throw new Error("User already exists");
          }

          // Hash the password
          const hashedPassword = await bcrypt.hash(password, 10);

          // Create a new user
          const newUser = new User({
            name,
            email,
            password: hashedPassword,
          });

          // Save the user to the database
          await newUser.save();

          return newUser;
        } catch (error) {
          throw new Error("User registration failed: " + error.message);
        }
      },
    },

    // Mutation to authenticate a user
    loginUser: {
      type: new GraphQLObjectType({
        name: "AuthPayload",
        fields: () => ({
          user: { type: UserType },
          token: { type: GraphQLString },
        }),
      }),
      args: {
        email: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, args) {
        const { email, password } = args;

        try {
          // Find the user by email
          const user = await User.findOne({ email });

          if (!user) {
            throw new Error("User not found");
          }

          // Verify the password
          const passwordMatch = await bcrypt.compare(password, user.password);

          if (!passwordMatch) {
            throw Error("Invalid credentials");
          }

          // If the email and password match, generate a JWT token
          const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
          });

          return { user, token };
        } catch (error) {
          throw new Error("User authentication failed: " + error.message);
        }
      },
    },

    // Mutation to update a user's password

    updateUserPassword: {
      type: UserType,
      args: {
        userId: { type: GraphQLNonNull(GraphQLID) },
        password: { type: GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, args) {
        const { userId, password } = args;
        try {
          // Find the user by ID
          const user = await User.findById(userId);

          if (!user) {
            throw new Error("User not found");
          }

          // Hash the new password
          const hashedPassword = await bcrypt.hash(password, 10);

          // Update the user's password
          user.password = hashedPassword;
          await user.save();

          return user;
        } catch (error) {
          throw new Error("Failed to update user password: " + error.message);
        }
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
