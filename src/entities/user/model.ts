import { createEffect, createEvent, createStore, sample } from 'effector';
import { reset, status } from 'patronum';
import { ApiUser } from '@/shared/lib/types';
import { authApi } from '@/shared/api/requests';

const $user = createStore<Nullable<ApiUser>>(null);

const setUser = createEvent<ApiUser>();
const logout = createEvent();

const logoutFx = createEffect(authApi.deleteAuthCookie);

sample({
  clock: setUser,
  target: $user,
});

sample({
  clock: logout,
  target: logoutFx,
});

reset({
  clock: logoutFx.done,
  target: $user,
});

export const model = {
  $user,
  setUser,
  logout,
  logoutStatus: status(logoutFx),
};
