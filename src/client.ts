import * as grcp from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import path from "path";
import { ProtoGrpcType } from "./proto/a";
import { AdderssBookServiceClient } from "./proto/AdderssBookService";

const packageDefinition = protoLoader.loadSync(
  path.join(__dirname, "../proto/user.proto")
);

const personProto = grcp.loadPackageDefinition(
  packageDefinition
) as unknown as ProtoGrpcType;

const client: AdderssBookServiceClient = new personProto.AdderssBookService(
  "localhost:50051",
  grcp.credentials.createInsecure()
);

async function startServer() {
  return new Promise((resolve, reject) => {
    // gRPC client to add a person
    client.AddPerson(
      {
        name: "John Doe",
        age: 22,
      },
      (err, response) => {
        if (err) {
          console.error("Error adding person", err);
          return reject(err);
        }

        console.log("Person added", response);
        resolve(response);
      }
    );

    // gRPC client to get a person by name
    client.GetPersonByName(
      {
        name: "John Doe",
      },
      (err, response) => {
        if (err) {
          console.error("Error getting person", err);
          return reject(err);
        }

        console.log("Person retrieved", response);
        resolve(response);
      }
    );

    // gRPC client to delete a person by name
    client.DeleteUserByName(
      {
        name: "John Doe",
      },
      (err, response) => {
        if (err) {
          console.error("Error deleting person", err);
          return reject(err);
        }

        console.log("Person deleted", response);
        resolve(response);
      }
    );
  });
}

async function main() {
  await startServer();
}

main();
