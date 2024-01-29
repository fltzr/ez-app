import { Mode as Theme, Density } from '@cloudscape-design/global-styles';
import Box from '@cloudscape-design/components/box';
import FormField from '@cloudscape-design/components/form-field';
import Header from '@cloudscape-design/components/header';
import Modal from '@cloudscape-design/components/modal';
import Select, { type SelectProps } from '@cloudscape-design/components/select';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Tiles from '@cloudscape-design/components/tiles';
import { useLayoutStore } from '@/stores/use-layout-store';
import comfortableDensity from './images/comfortable-density';
import compactDensity from './images/compact-density';

const themeOptions: SelectProps.Option[] = [
  { value: Theme.Light, label: 'Light' },
  { value: Theme.Dark, label: 'Dark' },
];

type UserPreferencesModalProps = {
  visible: boolean;
  onDismiss: () => void;
};
export const UserPreferencesModal = ({
  visible,
  onDismiss,
}: UserPreferencesModalProps) => {
  const { theme, density, setState } = useLayoutStore(state => ({
    theme: state.theme,
    density: state.density,
    setState: state.setState,
  }));

  return (
    <Modal
      size="medium"
      visible={visible}
      header={<Header variant="h2">Theme Settings</Header>}
      onDismiss={onDismiss}>
      <Box margin={{ bottom: 'l' }}>
        <SpaceBetween size="m" direction="vertical">
          <FormField label="Theme">
            <Select
              options={themeOptions}
              selectedOption={themeOptions.find(opt => opt.value === theme) ?? null}
              onChange={event => {
                setState({ theme: event.detail.selectedOption.value as Theme });
              }}
            />
          </FormField>
          <FormField label="Density">
            <Tiles
              value={density}
              items={[
                {
                  value: Density.Comfortable,
                  label: 'Comfortable',
                  image: comfortableDensity,
                },
                {
                  value: Density.Compact,
                  label: 'Compact',
                  image: compactDensity,
                },
              ]}
              onChange={({ detail }) => {
                setState({ density: detail.value as Density });
              }}
            />
          </FormField>
        </SpaceBetween>
      </Box>
    </Modal>
  );
};

export const Component = UserPreferencesModal;
