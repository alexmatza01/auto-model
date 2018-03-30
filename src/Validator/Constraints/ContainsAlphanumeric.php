<?php
/**
 * Created by PhpStorm.
 * User: User
 * Date: 3/27/2018
 * Time: 11:00 AM
 */

namespace App\Validator\Constraints;

use Symfony\Component\Validator\Constraint;

/**
 * @Annotation
 */
class ContainsAlphanumeric extends Constraint
{
    public $message = 'The string "{{ string }}" contains an illegal character: it can only contain letters or numbers etc.';
}