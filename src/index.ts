import path from "path";
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";

const packageDefinition = protoLoader.loadSync(
  path.join(__dirname, "../src/a.proto")
);
const personProto = grpc.loadPackageDefinition(packageDefinition);

const PERSONS = [];

// @ts-ignore

// call = req
// callback = res
function addPerson(call, callback) {
  let person = {
    name: call.request.name,
    age: call.request.age,
  };

  PERSONS.push(person);
  callback(null, person);
}

// const app = express();
const server = new grpc.Server();
// @ts-ignore
server.addService(personProto.AdderssBookService.service, {
  addPerson: addPerson,
});

// localhost:50051
server.bindAsync(
  "0.0.0.0:50051",
  grpc.ServerCredentials.createInsecure(),
  () => {
    server.start();
  }
);
