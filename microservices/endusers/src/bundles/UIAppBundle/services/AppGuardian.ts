/**
 * We customize the Guardian mostly because we have different models of Users, we fetch different data from server than the default and we
 * register them in different ways.
 *
 * Use the `useAppGuardian()` function instead of `useGuardian()`
 */
import { GuardianSmart, GuardianUserType, GuardianUserRegistrationType, useSmart } from '@bluelibs/x-ui-next';
import { gql } from '@apollo/client';
import { EndUsersRegisterInput } from 'src/api.types';

type AppUserType = GuardianUserType & {
  fullName: string;
};

type AppRegisterType = GuardianUserRegistrationType;

export class AppGuardian extends GuardianSmart<AppUserType, AppRegisterType> {
  public async load() {
    return super.load();
  }

  // TODO: this should be fixed in BL
  async resetPassword(username: string, token: string, newPassword: string) {
    return this.apolloClient
      .mutate({
        mutation: gql`
          mutation ($input: ResetPasswordInput!) {
            resetPassword(input: $input) {
              token
            }
          }
        `,

        variables: {
          input: {
            username,
            token,
            newPassword,
          },
        },
      })
      .then(async (response) => {
        const { token } = response.data.resetPassword;

        await this.storeToken(token);

        return token;
      });
  }

  public async register(input: EndUsersRegisterInput) {
    await this.apolloClient.mutate({
      mutation: gql`
        mutation ($input: EndUsersRegisterInput!) {
          EndUsersRegister(input: $input)
        }
      `,

      variables: {
        input,
      },
    });

    return null;
  }

  protected async retrieveUser(): Promise<AppUserType> {
    return this.apolloClient
      .query({
        query: gql`
          query me {
            me {
              _id
              email
              profile {
                firstName
                lastName
              }
              fullName
              roles
            }
          }
        `,
        fetchPolicy: 'network-only',
      })
      .then((response) => {
        return response.data.me;
      });
  }
}

/**
 * Use this instead `useGuardian()`
 * @returns
 */

// TODO: obviously, fix this
export function useAppGuardian(): AppGuardian {
  try {
    return useSmart(AppGuardian);
  } catch (_) {
    return new AppGuardian();
  }
}
