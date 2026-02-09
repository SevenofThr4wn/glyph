import { clientEnv } from "@/lib/env";
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
} from "@react-email/components";

interface PasswordResetProps {
  resetUrl: string;
}

const PasswordReset = (props: PasswordResetProps) => {
  const { resetUrl } = props;

  return (
    <Html lang="en" dir="ltr">
      <Tailwind>
        <Head />
        <Body className="bg-gray-100 py-10 font-sans">
          <Container className="mx-auto max-w-150 rounded-xl bg-white p-8">
            <Section>
              <Text className="mt-0 mb-4 text-[24px] font-bold text-gray-900">
                Reset Your Password
              </Text>

              <Text className="mt-0 mb-6 text-[16px] text-gray-700">
                We received a request to reset your password. Click the button
                below to create a new password for your account.
              </Text>

              <Button
                href={resetUrl}
                className="box-border rounded-md bg-red-600 px-8 py-3 text-[16px] font-medium text-white no-underline"
              >
                Reset Password
              </Button>

              <Text className="mt-6 mb-4 text-[14px] text-gray-600">
                This link will expire in 24 hours for security reasons.
              </Text>

              <Text className="mt-0 mb-8 text-[14px] text-gray-600">
                If you didn&apos;t request a password reset, you can safely
                ignore this email. Your password will remain unchanged.
              </Text>
            </Section>

            <Hr className="my-8 border-gray-200" />

            <Section>
              <Text className="m-0 text-[12px] text-gray-500">
                {clientEnv.NEXT_PUBLIC_BUSINESS_ADDRESS}
              </Text>

              <Text className="mt-2 mb-0 text-[12px] text-gray-500">
                <a href="#" className="text-gray-500 underline">
                  Unsubscribe
                </a>{" "}
                | © 2026 {clientEnv.NEXT_PUBLIC_APP_NAME}. All rights reserved.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export { PasswordReset };
