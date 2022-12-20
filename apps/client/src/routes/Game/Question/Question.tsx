// External dependencies
import { Socket } from 'socket.io-client';
import { useEffect, useState } from 'react';
import { useParams, useNavigate, NavigateFunction } from 'react-router-dom';
import dayjs from 'dayjs';

// Internal dependencies
import Answer from './components/Answer/Answer';
import { QUESTION_INTRO_TIME } from '_packages/shared/src/constants';
import { GameInformation, Question as QuestionType } from '_packages/shared/src/types';
import style from './Question.module.css';

export default function Question({ game, socket }: { game: GameInformation; socket: Socket }): JSX.Element {
	const { result } = useParams();
	const navigate: NavigateFunction = useNavigate();

	const [loadingTimer, setLoadingTimer] = useState<number>(0);
	const [questionTimer, setQuestionTimer] = useState<number>(100);
	const [loading, setLoading] = useState<boolean>(true);
	const [answered, setAnswered] = useState<number | undefined>();
	const [activeQuestion, setActiveQuestion] = useState<QuestionType | undefined>(undefined);

	useEffect(() => {
		setActiveQuestion(game.activeQuestion);
		const interval: NodeJS.Timer = setInterval((): undefined => {
			const result: number = (dayjs().diff(game.activeQuestion?.sentAt, 'ms') / QUESTION_INTRO_TIME) * 100;

			if (result > 100) {
				setLoadingTimer(100);
				setLoading(false);

				clearInterval(result);
				return;
			}
			setLoadingTimer(result);
		}, 1);

		return (): void => {
			clearInterval(interval);
		};
	}, [game.activeQuestion?.sentAt]);

	useEffect(() => {
		if (loading) return;

		const interval: NodeJS.Timer = setInterval((): undefined => {
			//Calculate the time left in the question in percentage (time in seconds = game.settings.questionTime)
			const result: number =
				100 -
				(dayjs().diff((game.activeQuestion?.sentAt || 0) + QUESTION_INTRO_TIME, 'ms') /
					((game.settings.questionTime || 0) * 1000)) *
					100;

			if (result < 0) {
				setQuestionTimer(0);
				clearInterval(interval);
				return;
			}

			setQuestionTimer(result);
		}, 1);

		return (): void => {
			clearInterval(interval);
		};
	}, [loading]);

	useEffect(() => {
		if (!result) return;

		const resultView: number = 5000;

		setActiveQuestion(game.previousQuestions[game.previousQuestions.length - 1]);

		setTimeout(() => {
			navigate(`/game/${game.id}/leaderboard`);
		}, resultView);

		setLoading(true);

		const interval: NodeJS.Timer = setInterval((): undefined => {
			const result: number = (dayjs().diff((game.activeQuestion?.sentAt || 0) + resultView, 'ms') / resultView) * 100;

			if (result > 100) {
				setLoadingTimer(100);
				setLoading(false);

				clearInterval(result);
				return;
			}
			setLoadingTimer(result);
		}, 1);

		return (): void => {
			clearInterval(interval);
		};
	}, [result]);

	return (
		<div className={style.content}>
			<p className={style.questionNumber}>Question {game.previousQuestions.length + (result ? 0 : 1)}.</p>
			<h2 className={style.question}>{activeQuestion?.question}</h2>

			<div className={style.timer}>
				<div className={style.timerBar} style={{ width: `${loading ? loadingTimer : questionTimer}%` }} />
			</div>

			{!loading && (
				<div className={style.answers}>
					{activeQuestion?.answers.map((answer: string, index: number) => (
						<Answer
							key={index}
							answer={answer}
							answered={
								result
									? activeQuestion?.answers.find((a: string) => a === answer) === activeQuestion?.correctAnswer
										? 'correct'
										: 'incorrect'
									: answered === index
										? 'answered'
										: undefined
							}
							onClick={(): void => {
								if (answered) return;
								setAnswered(index);
								socket.emit('answerQuestion', {
									gamePin: game.id,
									questionId: activeQuestion?.questionId,
									answer: answer
								});
							}}
						/>
					))}
				</div>
			)}
		</div>
	);
}
