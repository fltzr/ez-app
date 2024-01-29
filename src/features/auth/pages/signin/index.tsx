import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import Input from '@cloudscape-design/components/input';

import styles from './styles.module.scss';

const SignInPage = () => (
    <div className={styles['auth-form']}>
      <Container header={<Header variant="h1">Sign in</Header>}>
        <Input value="" placeholder="username" />
      </Container>
    </div>
  );

export const Component = SignInPage;
