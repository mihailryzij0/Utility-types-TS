const orderStates = [
  "initial",
  "inWork",
  "buyingSupplies",
  "producing",
  "fullfilled",
] as const;

type OrderState = typeof orderStates[number];
type FIXME = Exclude<OrderState, { state: "buyingSupplies" | "producing" }>[];
export const getUserOrderStates = (orderState: OrderState[]): FIXME =>
  orderState.filter(
    (state) => state !== "buyingSupplies" && state !== "producing"
  );
