export const POINT_ONE = '100000000000000000000000';

export class PostedMessage {
  sender: string;
  user: string;
  bet: bigint;
  hours: number;
  deadline: bigint;
  lastTime: string;
  readProcess: string;
  days: number;
  timer: bigint;

  constructor({
    sender,
    user,
    bet,
    hours,
    deadline,
    days,
    lastTime,
    readProcess,
    timer,
  }: PostedMessage) {
    this.sender = sender;
    this.user = user;
    this.bet = bet;
    this.days = days;
    this.hours = hours;
    this.deadline = deadline;
    this.lastTime = lastTime;
    this.readProcess = readProcess;
    this.timer = timer;
  }
}
