import { clientEnv } from '@/lib/config';
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Button,
  Hr,
  Tailwind,
} from '@react-email/components';

interface PasswordResetProps {
    resetUrl: string;
}

const PasswordReset = (props: PasswordResetProps) => {
  const { resetUrl } = props;

  return (
    <Html lang="en" dir="ltr">
      <Tailwind>
        <Head />
        <Body className="bg-gray-100 font-sans py-10">
          <Container className="bg-white rounded-xl p-8 max-w-150 mx-auto">
            <Section>
              <Text className="text-[24px] font-bold text-gray-900 mb-4 mt-0">
                Reset Your Password
              </Text>
              
              <Text className="text-[16px] text-gray-700 mb-6 mt-0">
                We received a request to reset your password. Click the button below to create a new password for your account.
              </Text>
              
              <Button
                href={resetUrl}
                className="bg-red-600 text-white px-8 py-3 rounded-md text-[16px] font-medium no-underline box-border"
              >
                Reset Password
              </Button>
              
              <Text className="text-[14px] text-gray-600 mb-4 mt-6">
                This link will expire in 24 hours for security reasons.
              </Text>
              
              <Text className="text-[14px] text-gray-600 mb-8 mt-0">
                If you didn&apos;t request a password reset, you can safely ignore this email. Your password will remain unchanged.
              </Text>
            </Section>
            
            <Hr className="border-gray-200 my-8" />
            
            <Section>
              <Text className="text-[12px] text-gray-500 m-0">
               {clientEnv.NEXT_PUBLIC_BUSINESS_ADDRESS}
              </Text>
              
              <Text className="text-[12px] text-gray-500 mt-2 mb-0">
                <a href="#" className="text-gray-500 underline">Unsubscribe</a> | 
                © 2026 {clientEnv.NEXT_PUBLIC_APP_NAME}. All rights reserved.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export { PasswordReset };