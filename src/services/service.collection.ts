import { interfaces } from "inversify";

export interface IServiceCollection extends interfaces.Container {}

export type ConfigureServiceCallback = (services: IServiceCollection) => void;
