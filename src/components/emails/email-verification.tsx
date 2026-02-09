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

interface OTPEmailProps {
  username: string;
  otp: string;
  verifyUrl: string;
}

const OTPEmail = (props: OTPEmailProps) => {
  const { username, otp, verifyUrl } = props;

  return (
    <Html lang="en" dir="ltr">
      <Tailwind>
        <Head />
        <Body className="bg-gray-100 py-10 font-sans">
          <Container className="mx-auto max-w-150 rounded-xl bg-white px-12 py-10">
            {/* Header */}
            <Section className="mb-8 text-center">
              <Text className="m-0 text-[24px] font-bold text-gray-900">
                Verify Your Account
              </Text>
            </Section>

            {/* Main Content */}
            <Section className="mb-8">
              <Text className="mb-6 text-[16px] leading-6 text-gray-700">
                Hi {username},
              </Text>
              <Text className="mb-6 text-[16px] leading-6 text-gray-700">
                You requested to verify your account. Use the verification code
                below to complete the process:
              </Text>

              {/* OTP Code Display */}
              <Section className="mb-8 rounded-xl bg-gray-50 px-8 py-6 text-center">
                <Text className="letter-spacing-[8px] m-0 text-[32px] font-bold text-gray-900">
                  {otp}
                </Text>
              </Section>

              <Text className="mb-8 text-[16px] leading-6 text-gray-700">
                This code will expire in 10 minutes for security reasons. If you
                didn&apos;t request this verification, please ignore this email.
              </Text>
            </Section>

            {/* CTA Button */}
            <Section className="mb-8 text-center">
              <Button
                href={verifyUrl}
                className="box-border rounded-xl bg-blue-600 px-8 py-4 text-[16px] font-semibold text-white no-underline"
              >
                Verify Account
              </Button>
            </Section>

            <Hr className="my-8 border-gray-200" />

            {/* Footer */}
            <Section className="text-center">
              <Text className="m-0 text-[14px] leading-5 text-gray-500">
                © 2026 {clientEnv.NEXT_PUBLIC_APP_NAME}. All rights reserved.
              </Text>
              <Text className="m-0 text-[14px] leading-5 text-gray-500">
                {clientEnv.NEXT_PUBLIC_BUSINESS_ADDRESS}
              </Text>
              <Text className="m-0 text-[14px] leading-5 text-gray-500">
                <a href="#" className="text-gray-500 underline">
                  Unsubscribe
                </a>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export { OTPEmail };
