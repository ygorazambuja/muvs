import { IHttp } from 'apps/web/infra/interfaces/IHttp';
import { BASE_URL } from '../../constants';
import { ISignUpDto } from './dto';

export class SignUpUseCase {
  constructor(private httpClient: IHttp, private signUpDTO: ISignUpDto) {}

  async execute() {
    const { data } = await this.httpClient.post(
      `${BASE_URL}/user/signup`,
      this.signUpDTO
    );
    return data;
  }
}
