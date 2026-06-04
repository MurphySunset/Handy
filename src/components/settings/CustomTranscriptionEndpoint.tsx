import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSettings } from "../../hooks/useSettings";
import { Input } from "../ui/Input";
import { SettingContainer } from "../ui/SettingContainer";

interface CustomTranscriptionEndpointProps {
  descriptionMode?: "inline" | "tooltip";
  grouped?: boolean;
}

export const CustomTranscriptionEndpoint: React.FC<CustomTranscriptionEndpointProps> =
  React.memo(({ descriptionMode = "tooltip", grouped = false }) => {
    const { t } = useTranslation();
    const { getSetting, updateSetting, isUpdating } = useSettings();

    const endpoint = getSetting("custom_transcription_endpoint") || "";
    const model =
      getSetting("custom_transcription_model") ||
      "mistralai/voxtral-mini-transcribe";
    const apiKey = getSetting("custom_transcription_api_key") || "";
    const [endpointValue, setEndpointValue] = useState(endpoint);
    const [modelValue, setModelValue] = useState(model);
    const [apiKeyValue, setApiKeyValue] = useState(apiKey);

    useEffect(() => {
      setEndpointValue(endpoint);
    }, [endpoint]);

    useEffect(() => {
      setModelValue(model);
    }, [model]);

    useEffect(() => {
      setApiKeyValue(apiKey);
    }, [apiKey]);

    const handleEndpointChange = (
      event: React.ChangeEvent<HTMLInputElement>,
    ) => {
      const value = event.target.value;
      setEndpointValue(value);
      updateSetting("custom_transcription_endpoint", value || null);
    };

    const handleModelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setModelValue(value);
      updateSetting("custom_transcription_model", value);
    };

    const handleApiKeyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setApiKeyValue(value);
      updateSetting("custom_transcription_api_key", value || null);
    };

    return (
      <SettingContainer
        title={t("settings.advanced.customTranscription.title")}
        description={t("settings.advanced.customTranscription.description")}
        descriptionMode={descriptionMode}
        grouped={grouped}
        layout="stacked"
      >
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_10rem] gap-2">
          <label className="space-y-1">
            <span className="text-sm font-medium">
              {t("settings.advanced.customTranscription.endpointLabel")}
            </span>
            <Input
              type="url"
              value={endpointValue}
              onChange={handleEndpointChange}
              placeholder={t(
                "settings.advanced.customTranscription.endpointPlaceholder",
              )}
              aria-busy={isUpdating("custom_transcription_endpoint")}
              className="w-full"
            />
          </label>
          <label className="space-y-1">
            <span className="text-sm font-medium">
              {t("settings.advanced.customTranscription.modelLabel")}
            </span>
            <Input
              type="text"
              value={modelValue}
              onChange={handleModelChange}
              placeholder={t(
                "settings.advanced.customTranscription.modelPlaceholder",
              )}
              aria-busy={isUpdating("custom_transcription_model")}
              className="w-full"
            />
          </label>
          <label className="space-y-1 sm:col-span-2">
            <span className="text-sm font-medium">
              {t("settings.advanced.customTranscription.apiKeyLabel")}
            </span>
            <Input
              type="password"
              value={apiKeyValue}
              onChange={handleApiKeyChange}
              placeholder={t(
                "settings.advanced.customTranscription.apiKeyPlaceholder",
              )}
              aria-busy={isUpdating("custom_transcription_api_key")}
              className="w-full"
            />
          </label>
        </div>
      </SettingContainer>
    );
  });
