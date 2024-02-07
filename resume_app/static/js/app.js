$(document).ready(function () {
    var csrftoken = $("[name=csrfmiddlewaretoken]").val();

    // Function to add a new input field for hard skills
    // function addHardSkillInput() {
    //     var hardSkillsSection = $("#hardSkillsSection");
    //     var newInput = $("<div class='mb-3'><div class='input-group'><div class='input-group-prepend'>" +
    //         "<input type='text' name='hardSkills[]' placeholder='Enter skill' class='form-control'>" +
    //         "</div><select class='border border-dark' id='hardSkillsCount'>" +
    //         "<option value='1'>1</option><option value='2'>2</option>" +
    //         "<option value='3'>3</option><option value='4'>4</option>" +
    //         "<option value='5'>5</option><option value='6'>6</option>" +
    //         "<option value='7'>7</option><option value='8'>8</option>" +
    //         "<option value='9'>9</option></select>" +
    //         "<button type='button' class='btn btn-success add-skill-btn' data-skill-type='hard'>+</button></div></div>");
    //     hardSkillsSection.append(newInput);
    // }

    // // Function to add a new input field for soft skills
    // function addSoftSkillInput() {
    //     var softSkillsSection = $("#softSkillsSection");
    //     var newInput = $("<div class='mb-3'><div class='input-group'><div class='input-group-prepend'>" +
    //         "<input type='text' name='softSkills[]' placeholder='Enter skill' class='form-control'>" +
    //         "</div><select class='border border-dark' id='softSkillsCount'>" +
    //         "<option value='1'>1</option><option value='2'>2</option>" +
    //         "<option value='3'>3</option><option value='4'>4</option>" +
    //         "<option value='5'>5</option><option value='6'>6</option>" +
    //         "<option value='7'>7</option><option value='8'>8</option>" +
    //         "<option value='9'>9</option></select>" +
    //         "<button type='button' class='btn btn-success add-skill-btn' data-skill-type='soft'>+</button></div></div>");
    //     softSkillsSection.append(newInput);
    // }

    // // Set the onclick handlers for the plus butt      ons
    // $("#addHardSkill").click(addHardSkillInput);
    // $("#addSoftSkill").click(addSoftSkillInput);

    $("#tailorButton").click(function () {
        var formData = {
            'name': $('#name').val(),
            'jobTitle': $('#jobTitle').val(),
            'jobDescription': $('#jobDescription').val(),
            'hardSkills': $('#hardSkills').val(),
            'softSkills': $('#softSkills').val(),
            'hardSkillsCount': $('#hardSkillsCount').val(), // Retrieve the selected count for hard skills
            'softSkillsCount': $('#softSkillsCount').val(), // Retrieve the selected count for soft skills
            'resume': $('#resume').val()
        };

        var hardSkills = $('[name="hardSkills[]"]').val().trim();
        if (hardSkills !== '') {
            formData['hardSkills'] = hardSkills;
        }

        var softSkills = $('[name="softSkills[]"]').val().trim();
        if (softSkills !== '') {
            formData['softSkills'] = softSkills;
        }


        var requiredFields = ['name', 'jobTitle', 'jobDescription', 'resume'];
        var emptyFields = requiredFields.filter(key => formData[key].trim() === '');
        if (emptyFields.length > 0) {
            console.log('Please fill in the following fields:', emptyFields);
            return;
        }

        $.ajaxSetup({
            headers: {
                "X-CSRFToken": csrftoken
            }
        });

        $.ajax({
            type: 'POST',
            url: '/api/tailor-resume/',
            data: JSON.stringify(formData),
            contentType: 'application/json',
            success: function (data) {
                console.log(formData);
                console.log('OpenAI API Response:', data);

                $('#resumeOutput').html(data['tailored_resume']);
            },
            error: function (data) {
                console.log('Error:', data);

                $('#resumeOutput').html('Error generating tailored resume. Please try again.');
            }
        });

    });
});
