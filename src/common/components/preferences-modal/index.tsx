import { lazy } from 'react';
import { Mode as Theme, Density } from '@cloudscape-design/global-styles';
import Box from '@cloudscape-design/components/box';
import FormField from '@cloudscape-design/components/form-field';
import Header from '@cloudscape-design/components/header';
import Select, { type SelectProps } from '@cloudscape-design/components/select';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Tiles from '@cloudscape-design/components/tiles';
import { usePreferencesStore } from '@/stores/use-preferences-store';
import comfortableDensity from './images/comfortable-density';
import compactDensity from './images/compact-density';

const LazyModal = lazy(() => import('@cloudscape-design/components/modal'));

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
  const { theme, setTheme } = usePreferencesStore((s) => ({
    theme: s.theme,
    setTheme: s.setTheme,
  }));
  const { density, setDensity } = usePreferencesStore((s) => ({
    density: s.density,
    setDensity: s.setDensity,
  }));

  return (
    <LazyModal
      size='medium'
      visible={visible}
      header={<Header variant='h2'>Theme Settings</Header>}
      onDismiss={onDismiss}>
      <Box margin={{ bottom: 'l' }}>
        <SpaceBetween size='m' direction='vertical'>
          <FormField label='Theme'>
            <Select
              options={themeOptions}
              selectedOption={
                themeOptions.find((opt) => opt.value === theme) ?? null
              }
              onChange={(event) => {
                setTheme(event.detail.selectedOption.value as Theme);
              }}
            />
          </FormField>
          <FormField label='Density'>
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
                setDensity(detail.value as Density);
              }}
            />
          </FormField>
        </SpaceBetween>
      </Box>
    </LazyModal>
  );
};

export const Component = UserPreferencesModal;
