"use client";
import Actionbar from "@/components/Actionbar/Actionbar";
import ContentCard from "@/components/content/ContentCard";
import CreateModal from "@/components/content/CreateModal";
import ShareModal from "@/components/Share/ShareModal";
import Sidebar from "@/components/sidebar/Sidebar";
import UserModal from "@/components/sidebar/UserModal";
import Settings from "@/components/Settings/Settings";
export default function Mind() {
  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="md:w-auto w-full md:h-full border-b md:border-b-0 ">
        <Sidebar />
      </div>

      <div className="flex flex-col flex-1 overflow-hidden">
        <Actionbar />
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="flex flex-row flex-wrap gap-4">
            <ContentCard />
            <ContentCard />
          
          </div>
        </div>
      </div>

      {/* basically these are globally moutnted models [dont get confused future ansh lol] */}
      <CreateModal />
       <UserModal />
       <ShareModal/>
       <Settings/>
    </div>
  );
}
