from celery import shared_task

from .models import ResumeAnalysis


@shared_task
def refresh_resume_score(analysis_id: int):
    analysis = ResumeAnalysis.objects.get(id=analysis_id)
    analysis.score = min(100, analysis.score + 3)
    analysis.save(update_fields=["score"])
    return analysis.score

