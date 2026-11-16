/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export default function App() {
  return (
    <div className="min-h-screen bg-[#FFFDF9] text-[#2B1B12] p-8 font-sans">
      <div className="max-w-3xl mx-auto space-y-6">
        <header className="rounded-2xl bg-gradient-to-r from-[#E65100] via-[#FF6F00] to-[#D4AF37] p-6 text-white shadow">
          <h1 className="text-2xl font-bold">Shri Maharani Yuba Club</h1>
          <p className="text-lg font-semibold text-[#FFF8E1]">श्री महारानी युवा क्लब</p>
          <p className="text-sm opacity-90 mt-1">
            Native Android Studio Project (Kotlin + Jetpack Compose + Firebase)
          </p>
        </header>

        <section className="rounded-xl border border-[#D4AF37]/40 bg-white p-6 space-y-3">
          <h2 className="text-lg font-bold text-[#7B1E1E]">Project Location &amp; Build Status</h2>
          <p className="text-sm leading-relaxed">
            The complete native Android Studio project has been created under{' '}
            <code className="bg-orange-50 px-1.5 py-0.5 rounded">ShriMaharaniYubaClub/</code>.
            This container environment does not include the Android SDK, JDK, or Gradle daemon, so the
            APK must be compiled locally in Android Studio or via Gradle.
          </p>
          <ul className="list-disc pl-5 text-sm space-y-1">
            <li>Provisioned Firebase Project ID: <code>gen-lang-client-0737154464</code></li>
            <li>Provisioned Firestore Database ID: <code>ai-studio-ec908cc0-c6c4-4d09-b597-55214b1cbe7f</code></li>
            <li>Firestore Security Rules: Hardened and deployed to Firebase</li>
          </ul>
        </section>

        <section className="rounded-xl border border-[#D4AF37]/40 bg-white p-6 space-y-2 text-sm">
          <h2 className="text-lg font-bold text-[#7B1E1E]">Next Steps to Build APK</h2>
          <ol className="list-decimal pl-5 space-y-1">
            <li>Register Android app <code>org.maharaniyubaclub.app</code> with your SHA-1/SHA-256 in Firebase Console and save <code>google-services.json</code> to <code>ShriMaharaniYubaClub/app/</code>.</li>
            <li>Enable Phone &amp; Email/Password Auth, upgrade to Blaze, and deploy Cloud Functions + Storage rules from <code>ShriMaharaniYubaClub/firebase/</code>.</li>
            <li>Open <code>ShriMaharaniYubaClub/</code> in Android Studio and run <code>./gradlew assembleDebug</code> or <code>./gradlew assembleRelease</code>.</li>
          </ol>
        </section>
      </div>
    </div>
  );
}
