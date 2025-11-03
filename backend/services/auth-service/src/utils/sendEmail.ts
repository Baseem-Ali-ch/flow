import { transporter } from "src/config/mail";

export const sendVerificationEmail = async (to: string, emailVerifyUrl: string) => {
  await transporter.sendMail({
    from: `ERP System`,
    to,
    subject: 'Verify You Email',
    html: `<p>Click below to verify your email:</p><a href="${emailVerifyUrl}">${emailVerifyUrl}</a>`,
  });
};
