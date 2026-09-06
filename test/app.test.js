// app.test.js
// Pure unit test of the exam navigation guard logic (no app.js dependency).
// The guard mirrors lines from app.js navigateTo for 'exam' case.

let state;
let showExam;
let toast;

// Replicate the guard logic from public/js/app.js navigateTo('exam') block
function guardExamAccess(moduleOrPage) {
  if (moduleOrPage !== 'exam') return;
  const trackModules = getCurrentTrackModules();
  const allModsDone = trackModules.every(function (mod) {
    return state.completedLessons.indexOf(mod.id) !== -1;
  });
  if (!allModsDone) {
    toast('Complete all modules in this Part before taking the Exam.');
    return;
  }
  showExam();
}

function getCurrentTrackModules() {
  return [{ id: 1 }, { id: 2 }, { id: 3 }];
}

beforeEach(() => {
  state = { completedLessons: [] };
  toast = jest.fn();
  showExam = jest.fn();
});

describe('Exam navigation guard', () => {
  test('prevents exam when not all modules completed', () => {
    state.completedLessons = [1];
    guardExamAccess('exam');
    expect(toast).toHaveBeenCalledWith('Complete all modules in this Part before taking the Exam.');
    expect(showExam).not.toHaveBeenCalled();
  });

  test('allows exam when all modules completed', () => {
    state.completedLessons = [1, 2, 3];
    guardExamAccess('exam');
    expect(toast).not.toHaveBeenCalled();
    expect(showExam).toHaveBeenCalled();
  });
});