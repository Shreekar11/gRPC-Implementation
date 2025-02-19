import path from "path";
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { Person } from "./proto/Person";
import { ProtoGrpcType } from "./proto/user";
import { AdderssBookServiceHandlers } from "./proto/AdderssBookService";

const packageDefinition = protoLoader.loadSync(
  path.join(__dirname, "../proto/user.proto")
);
const personProto = grpc.loadPackageDefinition(
  packageDefinition
) as unknown as ProtoGrpcType;

const PERSONS: Person[] = [];

const personHandlers: AdderssBookServiceHandlers = {
  AddPerson: (call, callback) => {
    let person = {
      name: call.request.name,
      age: call.request.age,
    };

    PERSONS.push(person);
    console.log("Person added", person);
    callback(null, person);
  },

  GetPersonByName: (call, callback) => {
    const { name } = call.request;
    const person = PERSONS.find((p) => p.name === name);
    if (!person) {
      callback({
        code: grpc.status.NOT_FOUND,
        details: "Not found",
      });
      return;
    }

    console.log("Person retrieved", person);
    callback(null, person);
  },

  DeleteUserByName: (call, callback) => {
    const { name } = call.request;
    const personIndex = PERSONS.findIndex((p) => p.name === name);

    if (personIndex === -1) {
      callback({
        code: grpc.status.NOT_FOUND,
        details: "Person Not found",
      });
    } else {
      const deletePerson = PERSONS.splice(personIndex, 1);
      console.log("Person deleted", deletePerson[0]);
      callback(null, deletePerson[0]);
    }
  },
};

// const app = express();
const server = new grpc.Server();
server.addService(personProto.AdderssBookService.service, personHandlers);

// localhost:50051
server.bindAsync(
  "0.0.0.0:50051",
  grpc.ServerCredentials.createInsecure(),
  () => {
    server.start();
  }
);
