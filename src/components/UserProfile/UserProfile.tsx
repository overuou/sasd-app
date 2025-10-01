import { Section, Cell, Avatar } from '@telegram-apps/telegram-ui';
import { FC } from 'react';
import { initDataState as _initDataState, useSignal, type User } from '@telegram-apps/sdk-react';

export const UserProfile: FC = () => {
  const initData = useSignal(_initDataState);
  const user: User | undefined = initData?.user;

  if (!user) {
    return null;
  }

  const fullName = [user.first_name, user.last_name].filter(Boolean).join(' ');
  const initials = fullName
    .split(' ')
    .map(name => name[0])
    .join('')
    .toUpperCase();

  return (
    <Section header="Profile">
      <Cell
        before={
          user.photo_url ? (
            <Avatar size={40} src={user.photo_url} />
          ) : (
            <Avatar size={40}>{initials}</Avatar>
          )
        }
        subtitle={user.username ? `@${user.username}` : undefined}
      >
        {fullName}
      </Cell>
    </Section>
  );
};