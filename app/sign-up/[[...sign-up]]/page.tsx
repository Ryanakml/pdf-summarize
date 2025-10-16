import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-purple-50">
      <SignUp
        appearance={{
          elements: {
            card: "shadow-2xl backdrop-blur-xl border border-purple-100 rounded-3xl",
            headerTitle: "text-2xl font-bold bg-gradient-to-r from-purple-600 to-fuchsia-500 text-transparent bg-clip-text",
            headerSubtitle: "text-gray-600",
            formButtonPrimary:
              "bg-gradient-to-r from-purple-600 to-fuchsia-500 hover:from-fuchsia-500 hover:to-purple-700 text-white font-semibold",
            footerActionLink: "text-fuchsia-600 hover:underline",
          },
          layout: {
            socialButtonsVariant: "iconButton",
            showOptionalFields: true,
          },
        }}
      />
    </div>
  );
}