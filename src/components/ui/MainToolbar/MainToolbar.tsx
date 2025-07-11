import * as React from 'react';
import { Toolbar } from 'radix-ui';
import { PlusIcon, Component1Icon } from '@radix-ui/react-icons';

import './mainToolbar.scss';
import { useEntites } from '@/contexts/nodes.context';

function ToolbarDemo(props: { clean: () => void }): React.ReactNode {
  const uEntites = useEntites();
  const [lastExport, _setLastExport] = React.useState<number>(0);

  const displayLastExport = (): string => {
    if (!lastExport || lastExport < 0) {
      return 'Never exported';
    }

    const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
    if (lastExport < 3600) {
      const minutes = -Math.round(lastExport / 60);
      return rtf.format(minutes, 'minute');
    }

    const hours = -Math.round(lastExport / 3600);
    return rtf.format(hours, 'hour');
  };

  return (
    <Toolbar.Root className="ToolbarRoot" aria-label="Formatting options">
      <Toolbar.ToggleGroup type="multiple" aria-label="Text formatting">
        <Toolbar.Button
          className="ToolbarToggleItem"
          value="bold"
          aria-label="Bold"
          onClick={() => {
            uEntites.addEntity();
          }}
        >
          <PlusIcon width="18" height="18" />
        </Toolbar.Button>
        <Toolbar.Button
          className="ToolbarToggleItem"
          value="bold"
          aria-label="Bold"
          onClick={() => {
            props.clean();
          }}
        >
          <Component1Icon width="18" height="18" />
        </Toolbar.Button>
      </Toolbar.ToggleGroup>
      <Toolbar.Separator className="ToolbarSeparator" />
      <Toolbar.Link className="ToolbarLink" style={{ marginRight: 10 }}>
        {displayLastExport()}
      </Toolbar.Link>
      <Toolbar.Button className="ToolbarButton" style={{ marginLeft: 'auto' }}>
        Export
      </Toolbar.Button>
    </Toolbar.Root>
  );
}

export default ToolbarDemo;
