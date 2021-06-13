type Keys<Type> = keyof Type;

type Values<Type> = Type[Keys<Type>];

export type { Keys, Values };
