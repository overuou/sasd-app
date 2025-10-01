import { FC } from 'react';
import { List } from '@telegram-apps/telegram-ui';
import { initDataState as _initDataState, useSignal, type User } from '@telegram-apps/sdk-react';

import { Page } from '@/components/Page.tsx';
import { UserProfile } from '@/components/UserProfile/UserProfile.tsx';
import { DisplayData, type DisplayDataRow } from '@/components/DisplayData/DisplayData.tsx';

function getUserRows(user: User): DisplayDataRow[] {
  return Object.entries(user).map(([title, value]) => ({ title, value }));
}

export const ProfilePage: FC = () => {
  const initData = useSignal(_initDataState);
  const user = initData?.user;

  const userDataRows = user ? getUserRows(user) : undefined;

  return (
    <Page>
      <List>
        <UserProfile />
        
        {userDataRows && (
          <DisplayData
            rows={userDataRows}
            header="User Data"
            footer="All available information about the current user"
          />
        )}
      </List>
    </Page>
  );
};