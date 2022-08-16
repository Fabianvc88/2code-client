import { Switch } from "@headlessui/react";

export default function ToggleSwitch({ enabled, setEnabled }) {
  return (
    <Switch
      checked={enabled}
      onChange={setEnabled}
      className={`${
        enabled ? "bg-green-600" : "bg-red-600"
      } relative inline-flex h-6 w-12 items-center rounded-full`}
    >
      <span
        className={`${
          enabled ? "translate-x-7" : "translate-x-1"
        } inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ease-in-out`}
      />
    </Switch>
  );
}
