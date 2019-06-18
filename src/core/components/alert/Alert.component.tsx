import * as React from 'react';
import { Subscription } from 'rxjs';
import { createPortal } from 'react-dom';

import { Container, Item } from './Alert.styled';
import { AlertType, alerts$ } from './alert.service';

export type AlertItemType = AlertType & {
  created: number;
};

export type AlertState = {
  alerts: AlertItemType[];
};

export class Alert extends React.Component<{}, AlertState> {
  private stream$ = new Subscription();
  private interval: number = -1;
  private readonly container: HTMLDivElement;

  public constructor(props: any) {
    super(props);

    this.container = document.createElement('div');
    this.container.id = 'alerts-container';

    this.state = {
      alerts: [],
    };
  }

  public componentDidMount(): void {
    this.stream$ = alerts$.subscribe(this.add);
    this.interval = setInterval(this.remove, 200);
    document.body.appendChild(this.container);
  }

  public componentWillUnmount(): void {
    this.stream$.unsubscribe();
    clearInterval(this.interval);
    document.body.removeChild(this.container);
  }

  private add = (alert: AlertType) => {
    this.setState((prevState) => ({
      alerts: [
        ...prevState.alerts,
        {
          ...alert,
          created: Date.now(),
        },
      ],
    }));
  };

  private remove = () => {
    const currentTime = Date.now();
    this.setState((prevState) => ({
      alerts: prevState.alerts.filter(
        (alert) => !alert.timeout || currentTime < alert.created + alert.timeout,
      ),
    }));
  };

  private forceRemove = (index: number) => {
    this.setState((prevState) => ({
      alerts: prevState.alerts.filter((alert, alertIndex) => index === alertIndex),
    }));
  };

  public render(): React.ReactNode {
    return createPortal(
      <Container>
        {this.state.alerts.map((alert, index) => (
          <Item onClick={() => this.forceRemove(index)} type={alert.type} key={index}>
            {alert.message}
          </Item>
        ))}
      </Container>,
      this.container,
    );
  }
}
