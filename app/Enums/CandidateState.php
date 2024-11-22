<?php

namespace App\Enums;

enum CandidateState: string
{
    case MAYBE = 'maybe';
    case SHORT_LIST = 'short_list';
    case NO = 'no';
    case HIRED = 'hired';
    case REJECTED = 'rejected';
}
