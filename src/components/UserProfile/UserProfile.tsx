import { Section, Cell, Avatar } from '@telegram-apps/telegram-ui';
import { FC } from 'react';
import { initDataState as _initDataState, useSignal, type User } from '@telegram-apps/sdk-react';
import { Link } from '@/components/Link/Link.tsx';

interface UserProfileProps {
  clickable?: boolean;
}

export const UserProfile: FC<UserProfileProps> = ({ clickable }) => {
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

  const content = (
    <Cell
      before={
        user.photo_url ? (
          <Avatar size={40} src={user.photo_url} />
        ) : (
          <Avatar size={40}>{initials}</Avatar>
        )
      }
      subtitle={user.username ? `@${user.username}` : undefined}
      after={clickable ? '>' : undefined}
    >
      {fullName}
    </Cell>
  );

  return (
    <Section header="Profile">
      {clickable ? (
        <Link to="/profile">{content}</Link>
      ) : (
        content
      )}
    </Section>
  );
};