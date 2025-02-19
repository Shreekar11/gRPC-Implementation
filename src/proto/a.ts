import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { AdderssBookServiceClient as _AdderssBookServiceClient, AdderssBookServiceDefinition as _AdderssBookServiceDefinition } from './AdderssBookService';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  AdderssBookService: SubtypeConstructor<typeof grpc.Client, _AdderssBookServiceClient> & { service: _AdderssBookServiceDefinition }
  GetPersonByNameRequest: MessageTypeDefinition
  Person: MessageTypeDefinition
}

