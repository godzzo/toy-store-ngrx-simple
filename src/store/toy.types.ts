export type Toy = {
  id: number;
  name: string;
};

export type ToyState = {
  items: Toy[];
  current: Toy | null;
  mode: 'new' | 'edit' | null;
};

export const intialToyState: ToyState = {
  items: [
    { id: 1, name: 'Alpakka' },
    { id: 2, name: 'Bruhaha' },
    { id: 3, name: 'Margo' },
  ],
  current: { id: 1, name: 'Alpakka' },
  mode: 'edit',
};
