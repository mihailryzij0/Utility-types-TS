const orderStates = [
  "initial",
  "inWork",
  "buyingSupplies",
  "producing",
  "fullfilled",
] as const;

type OrderState = typeof orderStates[number];
type FIXME = Exclude<OrderState, "buyingSupplies" | "producing">[];
export const getUserOrderStates = (orderState: OrderState[]): FIXME => {
  const filteredState = [] as FIXME;
  orderStates.forEach((element) => {
    if (element !== "buyingSupplies" && element !== "producing") {
      filteredState.push(element);
    }
  });
  return filteredState;
};

