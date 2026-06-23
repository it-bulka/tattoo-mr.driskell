import { useTranslation } from "react-i18next";
import { useState, useCallback, memo } from "react";
import { Button } from "@/shared/ui";
import { LogoutModal } from "./LogoutModal.tsx";

interface LogoutButtonProps {
  className?: string;
}

export const LogoutButton = memo(({ className }: LogoutButtonProps) => {
  const { t } = useTranslation("auth");
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = useCallback(() => setIsOpen(true), []);
  const onClose = useCallback(() => setIsOpen(false), []);

  return (
    <>
      <Button className={className} dark onClick={onOpen}>
        {t("logout")}
      </Button>
      {isOpen && <LogoutModal isOpen onClose={onClose} />}
    </>
  );
});

LogoutButton.displayName = "LogoutButton";
