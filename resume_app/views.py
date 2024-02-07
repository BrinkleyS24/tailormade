from django.http import JsonResponse
from django.shortcuts import render
from openai import OpenAI
import json
from django.views.decorators.csrf import csrf_exempt

client = OpenAI(
    api_key="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"
)

@csrf_exempt
def generate_tailored_resume(request):
    try:
        # Extract data from the dictionary
        data = json.loads(request.body.decode('utf-8'))
        name = data.get('name', '')
        job_title = data.get('jobTitle', '')
        job_description = data.get('jobDescription', '')
        resume = data.get('resume', '')
        hard_skills = data.get('hardSkills', '')
        soft_skills = data.get('softSkills', '')
        hard_skills_count = data.get('hardSkillsCount', '')
        soft_skills_count = data.get('softSkillsCount', '')



        # Provide more specific instructions for tailoring
        input_text = (
            f"I'm applying for the role of {job_title}. "
            f"Here is the job description: {job_description}. "
            f"Here is my resume: {resume}. "
            f"Please tailor the given resume to the job description and incorporate all of the following hard skills, ensuring each one is highlighted at least {hard_skills_count} time(s): {hard_skills}. "
            "For each hard skill, provide specific examples and measurable achievements that showcase proficiency. "
            f"Additionally, it is crucial to include all of the following soft skills, ensuring each one is showcased at least {soft_skills_count} time(s) in a relevant and impactful context: {soft_skills}. "
            "Highlight instances where these soft skills played a crucial role, emphasizing their positive impact. Please include all skills provided; it is very important. "
            "Ensure the job title is seamlessly integrated, keep it concise, avoid cliches, don't go over 550 words but no less than 400, and include at least 5 instances of measurable metrics. Please don't go over the word count. "
            "Please note that all specified hard and soft skills must be integrated into the tailored resume. It is very important to my mission"
            "Provide me with the final tailored resume without including phrases like 'Tailored Resume' or any additional notes."
        )

        completion = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a resume tailoring assistant."},
                {"role": "user", "content": input_text}
            ]
        )

        # Extract the generated content from the response
        generated_text = completion.choices[0].message.content

        # Format the section title and content
        formatted_section = f"\n\n{generated_text}\n\n"

        # Return JsonResponse with tailored resume
        return JsonResponse({'tailored_resume': formatted_section, 'error': ''})

    except Exception as e:
        print(f"Error generating tailored resume: {e}")
        return JsonResponse({'error': f"Error generating tailored resume: {e}"})


@csrf_exempt
def tailor_resume(request):
    if request.method == 'POST':
        try:
            # Get the raw JSON data from the request body
            json_data = json.loads(request.body.decode('utf-8'))

            # Call the function with the correct arguments
            tailored_resume = generate_tailored_resume(request)

            # Pass the tailored resume as JsonResponse
            return tailored_resume

        except Exception as e:
            print(f"Error processing JSON data: {e}")
            return JsonResponse({'error': f"Error processing JSON data: {e}"})
    else:
        return render(request, 'index.html')

def home(request):
    return render(request, 'home.html')