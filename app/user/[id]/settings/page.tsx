import { FloatingLabelInput } from "@/app/_components/users/NameInput/FloatingLabelInput";
import { Button } from "@mantine/core";

const SettingsPage = () => {
  return (
    <div className="space-y-5">
      <div className="text-3xl font-semibold text-gray-600">
        Account Settings
      </div>
      <div className=" border-2 p-10 rounded-md">
        <div className="flex flex-col space-y-5">
          {/* profile name change */}
          <div className="flex flex-col space-y-5 border-b-2 pb-5">
            <div className="text-2xl font-semibold text-gray-500">
              Account Name
            </div>
            <div className="flex space-x-5 items-end">
              {/* first name */}
              <FloatingLabelInput
                label="First Name"
                placeholder="Enter Your First Name"
                Invalue="John"
              />

              {/* last name */}
              <FloatingLabelInput
                label="Last Name"
                placeholder="Enter Your Last Name"
                Invalue="Smith"
              />

              {/* save name button */}
              <Button size="compact-md" color="yellow">
                Save
              </Button>
            </div>
          </div>

          {/* password change */}
          <div className="flex flex-col space-y-5 border-b-2 pb-5">
            <div className="text-2xl font-semibold text-gray-500">Password</div>
            <div className="flex space-x-5 items-end">
              {/* old password */}
              <FloatingLabelInput
                label="Old Password"
                placeholder="Enter Your Old Password"
              />

              {/* new password */}
              <FloatingLabelInput
                label="New Password"
                placeholder="Enter Your New Password"
              />

              {/* save password button */}
              <Button size="compact-md" color="yellow">
                Save
              </Button>
            </div>
          </div>

          {/* Delete Account */}
          <div className="flex flex-col space-y-5">
            <div className="text-2xl font-semibold text-gray-500">
              Delete Account
            </div>
            {/* warning text */}
            <div className="text-red-500">
              Warning: This action cannot be undone.
              </div>
            <div className="flex space-x-5 items-end">
              <Button size="compact-md" color="red">
                Delete Account
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
