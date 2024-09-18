

type SettingsBtnType = {
    settingTab: string,
    activeTab: string,
    icon: React.ComponentType; // Use React.ComponentType to type the icon prop
    setActiveTab: (tab: string)=> void
}

const SettingsBtn: React.FC<SettingsBtnType> = ({ icon: Icon, settingTab, activeTab , setActiveTab}) => {
  return (
    <button
    onClick={() => setActiveTab(settingTab)}
      className={`${
        activeTab === settingTab
          ? "bg-purple text-black"
          : "bg-darkGray text-white"
      } flex-shrink-0 active:scale-95 duration-200  p-4 h-[130px] flex flex-col justify-between w-[150px] max-w-[150px] rounded-xl`}
    >
      <div className="text-3xl">
        <Icon />
      </div>
      <div className="flex flex-col text-start">
        <span className="font-bold text-xl">{settingTab}</span>
      </div>
    </button>
  );
};

export default SettingsBtn;
