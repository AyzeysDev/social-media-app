import { Icon, Message, Divider } from 'semantic-ui-react';
import { useRouter } from "next/router";
import Link from "next/link";

export const HeaderMessage = () => {
  const router = useRouter()

  const signupRoute = router.pathname === '/signup'

  return (
    <Message 
    color="teal"
    attached header={signupRoute ? "Get Started" : "Welcome Back"}
    icon = {signupRoute ? "settings" : "privacy"}
    content = {signupRoute ? "Create New Account" : "Sign In with existing Email and Password"}
    />
  );
};

export const FooterMessage = () => {
  const router = useRouter()

  const signupRoute = router.pathname === '/signup'

  return (
  <> 
  {signupRoute ? (
  <>
    <Message attached = 'bottom' warning>
    <Icon name = 'help'></Icon>
    Existing User ? <Link href = '/login'>Sign In here instead</Link>    
    </Message>
    <Divider hidden />
  </>
  ) : (
  <>
    <Message attached = 'bottom' info>
    <Icon name = 'lock'></Icon>
    <Link href = '/reset'>Forgot Password ?</Link>    
    </Message>

    <Message attached = 'bottom' warning>
    <Icon name = 'help'></Icon>
    New User ? <Link href = '/signup'>Signup here</Link> Instead{" "}
    </Message>
  </>
  )}
  </>
  );
};