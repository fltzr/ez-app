import { useNavigate } from 'react-router-dom';
import { Button, Container, Header, SpaceBetween } from '@cloudscape-design/components';
import { FormInput } from '@/components/form/form-input';
import { GenericForm } from '@/components/form/generic-form';

import { useAuthStore } from '@/stores/use-auth-store';
import { useNotificationStore } from '@/stores/use-notification-store';
import { useSigninMutation } from '../../hooks/use-auth-api';
import { signInSchema, type SignInSchemaType } from '../../types';
import styles from './styles.module.scss';

const SignInPage = () => {
  const signinMutation = useSigninMutation();
  const navigate = useNavigate();
  const setAuthState = useAuthStore(state => state.setAuthState);
  const addNotification = useNotificationStore(state => state.addNotification);

  const handleSignin = (data: SignInSchemaType) => {
    signinMutation.mutate(data, {
      onSuccess: user => {
        setAuthState({ user, isAuthenticated: true });
        navigate('/home');
      },
      onError: error => {
        addNotification({
          type: 'error',
          id: `signin-error-${Date.now()}`,
          header: 'Error signing in...',
          content: JSON.stringify(error),
          dismissible: true,
          dismissLabel: 'Close',
        });
      },
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles['auth-form']}>
        <Container>
          <SpaceBetween direction="vertical" size="xl">
            <GenericForm
              header={<Header variant="h2">Sign in</Header>}
              variant="embedded"
              formId="signin-form"
              schema={signInSchema}
              onSubmit={handleSignin}>
              <FormInput<SignInSchemaType>
                disableBrowserAutocorrect
                name="username"
                label="Username"
                spellcheck={false}
                autoComplete={false}
              />
              <FormInput<SignInSchemaType>
                sensitive
                disableBrowserAutocorrect
                name="password"
                label="Password"
                type="password"
                spellcheck={false}
                autoComplete={false}
              />
            </GenericForm>
            <Button
              fullWidth
              form="signin-form"
              formAction="submit"
              variant="primary"
              loadingText="Signing in...">
              Log in
            </Button>
          </SpaceBetween>
        </Container>
      </div>
    </div>
  );
};

export const Component = SignInPage;
