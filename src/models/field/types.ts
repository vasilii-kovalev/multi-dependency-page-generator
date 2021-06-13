import { Post } from "models/post/types";
import { User } from "models/user/types";
import { Keys } from "types/utils";

type Field<Entity extends Post | User = Post | User> = Keys<Entity>;

type Fields<Entity extends Post | User = Post | User> = Field<Entity>[];

export type { Field, Fields };
