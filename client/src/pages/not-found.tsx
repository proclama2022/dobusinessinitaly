import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { buildLocalizedPath } from "@/lib/languagePaths";

export default function NotFound() {
  const { t, i18n } = useTranslation();
  const [location, navigate] = useLocation();

  useEffect(() => {
    const payload = {
      path: location,
      lang: i18n.language,
      referrer: document.referrer || undefined,
      userAgent: navigator.userAgent,
      ts: Date.now(),
    };

    const blob = new Blob([JSON.stringify(payload)], { type: "application/json" });
    const url = "/api/track-404";

    if (navigator.sendBeacon) {
      navigator.sendBeacon(url, blob);
    } else {
      fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        keepalive: true,
        credentials: "same-origin",
      }).catch(() => {});
    }
  }, [location, i18n.language]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md mx-4">
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-2 items-center">
            <AlertCircle className="h-8 w-8 text-red-500" />
            <h1 className="text-2xl font-bold text-gray-900">{t("notFound.title", "404 Page Not Found")}</h1>
          </div>

          <p className="mt-2 text-sm text-gray-600">
            {t("notFound.subtitle", "Did you forget to add the page to the router?")}
          </p>

          <div className="mt-6 flex gap-2 flex-wrap">
            <Button variant="default" onClick={() => navigate("/")}>{t("common.home", "Home")}</Button>
            <Button variant="secondary" onClick={() => navigate(buildLocalizedPath('/blog', i18n.language))}>{t("common.blog", "Blog")}</Button>
            <Button variant="outline" onClick={() => navigate(buildLocalizedPath('/contact', i18n.language))}>{t("common.contactUs", "Contact Us")}</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
