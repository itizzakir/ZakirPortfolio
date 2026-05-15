import emailjs from "@emailjs/browser";

export async function sendContactMessage(values) {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    const mailto = `mailto:itizzakir@gmail.com?subject=${encodeURIComponent(
      values.subject || "Portfolio contact",
    )}&body=${encodeURIComponent(`${values.message}\n\nFrom: ${values.name} <${values.email}>`)}`;

    window.location.href = mailto;
    return { fallback: true };
  }

  await emailjs.send(
    serviceId,
    templateId,
    {
      from_name: values.name,
      from_email: values.email,
      subject: values.subject,
      message: values.message,
      to_name: "Md Zakir Hussain",
    },
    { publicKey },
  );

  return { fallback: false };
}
