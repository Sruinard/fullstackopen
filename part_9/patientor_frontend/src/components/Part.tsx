import CoursePart from "../types/types";

const assertNever = (value: never): never => {
    throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

const Part = ({ part }: { part: CoursePart }) => {
    switch (part.kind) {
        case "basic":
            return <div>{part.name} {part.exerciseCount} {part.description}</div>;
        case "group":
            return <div>{part.name} {part.exerciseCount} {part.groupProjectCount}</div>;
        case "background":
            return <div>{part.name} {part.exerciseCount} {part.description} {part.backgroundMaterial}</div>;
        case "special":
            return <div>{part.name} {part.exerciseCount} {part.description} {part.requirements.join(", ")}</div>;
        default:
            return assertNever(part);
    }
};

export default Part;