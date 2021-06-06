import { BadRequestException } from "@nestjs/common";
import { CustomScalar, Scalar } from "@nestjs/graphql";
import { Kind, ValueNode } from "graphql";
import { Maybe } from "graphql/jsutils/Maybe";

@Scalar("IsoDateTime")
export class IsoDateTimeScalar implements CustomScalar<string, Date> {
    description: string;

    parseValue(value: unknown): Date {
        if (typeof value === "string") {
            return new Date(value);
        } else {
            throw new BadRequestException(``);
        }
    }

    serialize(value: Date): string {
        return value.toISOString();
    }

    parseLiteral(valueNode: ValueNode): Maybe<Date> {
        if (valueNode.kind === Kind.STRING) {
            return new Date(valueNode.value);
        }
        return null;
    }
}
