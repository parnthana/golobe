import { ReactElement } from "react";

export interface ContainerCommon<T> {
  render: (props: T) => ReactElement;
}
