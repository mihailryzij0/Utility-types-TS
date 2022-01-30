

// type FIXME = React.ComponentType extends { defaultProps?: infer P}? P | undefined : never ;
// type FIXME<T> = React.ComponentType<T>['defaultProps'] ;
type FIXME = Pick<React.ComponentType,  'defaultProps'> | undefined
export const getDefaultProps = <T>(
  component: React.ComponentType<T>
): FIXME => {
  return component.defaultProps;
};

