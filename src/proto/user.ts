import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { PersonServiceClient as _PersonServiceClient, PersonServiceDefinition as _PersonServiceDefinition } from './PersonService';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  GetPersonByNameRequest: MessageTypeDefinition
  Person: MessageTypeDefinition
  PersonService: SubtypeConstructor<typeof grpc.Client, _PersonServiceClient> & { service: _PersonServiceDefinition }
}

