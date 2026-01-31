import { clientEnv } from "@/lib/config";
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
        <Body className="bg-gray-100 font-sans py-10">
          <Container className="bg-white rounded-xl px-12 py-10 max-w-150 mx-auto">
            {/* Header */}
            <Section className="text-center mb-8">
              <Text className="text-[24px] font-bold text-gray-900 m-0">
                Verify Your Account
              </Text>
            </Section>

            {/* Main Content */}
            <Section className="mb-8">
              <Text className="text-[16px] text-gray-700 leading-6 mb-6">
                Hi {username},
              </Text>
              <Text className="text-[16px] text-gray-700 leading-6 mb-6">
                You requested to verify your account. Use the verification code
                below to complete the process:
              </Text>

              {/* OTP Code Display */}
              <Section className="text-center bg-gray-50 rounded-xl py-6 px-8 mb-8">
                <Text className="text-[32px] font-bold text-gray-900 letter-spacing-[8px] m-0">
                  {otp}
                </Text>
              </Section>

              <Text className="text-[16px] text-gray-700 leading-6 mb-8">
                This code will expire in 10 minutes for security reasons. If you
                didn&apos;t request this verification, please ignore this email.
              </Text>
            </Section>

            {/* CTA Button */}
            <Section className="text-center mb-8">
              <Button
                href={verifyUrl}
                className="bg-blue-600 text-white px-8 py-4 rounded-xl text-[16px] font-semibold no-underline box-border"
              >
                Verify Account
              </Button>
            </Section>

            <Hr className="border-gray-200 my-8" />

            {/* Footer */}
            <Section className="text-center">
              <Text className="text-[14px] text-gray-500 leading-5 m-0">
                © 2026 {clientEnv.NEXT_PUBLIC_APP_NAME}. All rights reserved.
              </Text>
              <Text className="text-[14px] text-gray-500 leading-5 m-0">
                {clientEnv.NEXT_PUBLIC_BUSINESS_ADDRESS}
              </Text>
              <Text className="text-[14px] text-gray-500 leading-5 m-0">
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
